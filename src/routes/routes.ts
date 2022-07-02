import Router from 'koa-router';
import {
  getSingleMission,
  updateSingleMission,
  getAllMissions,
  createMission,
} from '../controllers/missionsController';

const router = new Router();

router.get('/missions', getAllMissions);
router.get('/missions/:id', getSingleMission);

router.post('/missions', createMission);
// TODO:
router.put('/missions/:id', updateSingleMission);
// TODO:
// router.delete()

export { router };
