import { Router } from 'express'
import { OsszesDolgozat, DogaById, CreateDolgozat, DeleteDolgozat, UpdateDolgozat } from '../controllers/ctrl.js';

const router = Router();

router.get('/', (req, res) => {
  res.send({ msg: 'Hello from the backend!' });
});

router.get('/dogak', OsszesDolgozat);
router.get('/dogak/:id', DogaById);

router.post('/dogak', CreateDolgozat);

router.patch('/dogak/:id', UpdateDolgozat)

router.delete('/dogak/:id', DeleteDolgozat);

export default router;