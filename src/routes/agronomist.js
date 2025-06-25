const express = require('express');
const router = express.Router();
const Agronomist = require('../models/agronomist');
const agronomistSignupController = require('../controllers/agronomistSignup');
const agronomistLoginController = require('../controllers/agronomistLogin');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/agronomist:
 *   get:
 *     summary: Get all agronomists
 *     tags: [Agronomist]
 *     responses:
 *       200:
 *         description: List of all agronomists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agronomist'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const agronomists = await Agronomist.find();
    res.json(agronomists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/agronomist/{id}:
 *   get:
 *     summary: Get an agronomist by ID
 *     tags: [Agronomist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The agronomist ID
 *     responses:
 *       200:
 *         description: Agronomist found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agronomist'
 *       404:
 *         description: Agronomist not found
 */
router.get('/:id', async (req, res) => {
  try {
    const agronomist = await Agronomist.findById(req.params.id);
    if (!agronomist) return res.status(404).json({ message: 'Not found' });
    res.json(agronomist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/agronomist:
 *   post:
 *     summary: Create a new agronomist
 *     tags: [Agronomist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agronomist'
 *     responses:
 *       201:
 *         description: Agronomist created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agronomist'
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
  try {
    const agronomist = new Agronomist(req.body);
    await agronomist.save();
    res.status(201).json(agronomist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/agronomist/{id}:
 *   put:
 *     summary: Update an agronomist by ID
 *     tags: [Agronomist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The agronomist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agronomist'
 *     responses:
 *       200:
 *         description: Agronomist updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agronomist'
 *       404:
 *         description: Agronomist not found
 */
router.put('/:id', async (req, res) => {
  try {
    const agronomist = await Agronomist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!agronomist) return res.status(404).json({ message: 'Not found' });
    res.json(agronomist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/agronomist/{id}:
 *   delete:
 *     summary: Delete an agronomist by ID
 *     tags: [Agronomist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The agronomist ID
 *     responses:
 *       200:
 *         description: Agronomist deleted
 *       404:
 *         description: Agronomist not found
 */
router.delete('/:id', async (req, res) => {
  try {
    const agronomist = await Agronomist.findByIdAndDelete(req.params.id);
    if (!agronomist) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST signup
router.post('/signup', agronomistSignupController.signup);

// POST login
router.post('/login', agronomistLoginController.login);

// Example protected route
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

module.exports = router;