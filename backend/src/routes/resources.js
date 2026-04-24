const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// Public routes
router.get('/', resourceController.getAllResources);
router.get('/:id', resourceController.getResourceById);
router.get('/:id/availability', resourceController.getResourceAvailability);

// Admin routes
router.post('/', verifyToken, requireAdmin, resourceController.createResource);
router.put('/:id', verifyToken, requireAdmin, resourceController.updateResource);
router.delete('/:id', verifyToken, requireAdmin, resourceController.deleteResource);

module.exports = router;
