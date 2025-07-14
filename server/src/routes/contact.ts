import express from 'express';
import { Database } from '../config/database';
import { authenticateToken, requireRole } from '../middleware/auth';
import { validateContact } from '../middleware/validation';
import emailService from '../services/emailService';

const router = express.Router();
const db = Database.getInstance();

// Submit contact form
router.post('/', validateContact, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactMessage = db.addContactMessage({
      name,
      email,
      subject,
      message
    });

    // Send confirmation email to user
    await emailService.sendContactConfirmation(email, name);

    res.status(201).json({
      message: 'Your message has been sent successfully. We will get back to you soon.',
      id: contactMessage.id
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all contact messages (admin only)
router.get('/', authenticateToken, requireRole(['admin']), (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status,
      search 
    } = req.query;

    let filteredMessages = [...db.contactMessages];

    // Apply filters
    if (status) {
      filteredMessages = filteredMessages.filter(msg => msg.status === status);
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredMessages = filteredMessages.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm) ||
        msg.email.toLowerCase().includes(searchTerm) ||
        msg.subject.toLowerCase().includes(searchTerm) ||
        msg.message.toLowerCase().includes(searchTerm)
      );
    }

    // Sort by creation date (newest first)
    filteredMessages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedMessages = filteredMessages.slice(startIndex, endIndex);

    res.json({
      messages: paginatedMessages,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(filteredMessages.length / Number(limit)),
        totalMessages: filteredMessages.length,
        hasNext: endIndex < filteredMessages.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get contact message by ID (admin only)
router.get('/:id', authenticateToken, requireRole(['admin']), (req, res) => {
  try {
    const message = db.contactMessages.find(msg => msg.id === req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Mark as read if it was new
    if (message.status === 'new') {
      const messageIndex = db.contactMessages.findIndex(msg => msg.id === req.params.id);
      db.contactMessages[messageIndex] = {
        ...message,
        status: 'read'
      };
    }

    res.json(message);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update message status (admin only)
router.patch('/:id/status', authenticateToken, requireRole(['admin']), (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'read', 'replied'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const messageIndex = db.contactMessages.findIndex(msg => msg.id === req.params.id);
    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    db.contactMessages[messageIndex] = {
      ...db.contactMessages[messageIndex],
      status
    };

    res.json({
      message: 'Message status updated successfully',
      contactMessage: db.contactMessages[messageIndex]
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete contact message (admin only)
router.delete('/:id', authenticateToken, requireRole(['admin']), (req, res) => {
  try {
    const messageIndex = db.contactMessages.findIndex(msg => msg.id === req.params.id);
    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    db.contactMessages.splice(messageIndex, 1);
    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get contact statistics (admin only)
router.get('/stats/overview', authenticateToken, requireRole(['admin']), (req, res) => {
  try {
    const stats = {
      total: db.contactMessages.length,
      new: db.contactMessages.filter(msg => msg.status === 'new').length,
      read: db.contactMessages.filter(msg => msg.status === 'read').length,
      replied: db.contactMessages.filter(msg => msg.status === 'replied').length
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;