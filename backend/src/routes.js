import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import RecipientController from './app/controllers/RecipientController';
import AddressController from './app/controllers/AddressController';
import AddressManController from './app/controllers/AddressManController';

import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryManOrderController from './app/controllers/DeliveryManOrderController';
import DeliveryManEnableController from './app/controllers/DeliveryManEnableController';
import SearchDeliverymanController from './app/controllers/SearchDeliverymanController';

import PeopleController from './app/controllers/PeopleController';
import UserController from './app/controllers/UserController';

import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemController from './app/controllers/ProblemController';

import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import UserAvatarUpdateController from './app/controllers/UserAvatarUpdateController';
import AuthMiddleware from './app/middlewares/auth';

import DeliveryManSessionController from './app/controllers/DeliveryManSessionController';
import GroupController from './app/controllers/GroupController';
import GroupUserController from './app/controllers/GroupUserController';

import OrderController from './app/controllers/OrderController';
import OrderCancelWithdrawController from './app/controllers/OrderCancelWithdrawController';
import OrderSearchController from './app/controllers/OrderSearchController';
import OrderDeliveredController from './app/controllers/OrderDeliveredController';
import DeliveryManAllOrderController from './app/controllers/DeliveryManAllOrderController';

import DeliveryManOrderStatusController from './app/controllers/DeliveryManOrderStatusController';

import SelectCityController from './app/controllers/SelectCityController';
import SelectStateController from './app/controllers/SelectStateController';
import SelectRecipientController from './app/controllers/SelectRecipientController';
import SearchRecipientController from './app/controllers/SearchRecipientController';

import SearchCityController from './app/controllers/SearchCityController';
import ProfileController from './app/controllers/ProfileController';
import validateUserStore from './app/validators/UserStore';

import validateOrderStore from './app/validators/OrderStore';
import validateOrderUpdate from './app/validators/OrderUpdate';

import validateRecipientStore from './app/validators/RecipientStore';
import validateRecipientUpdate from './app/validators/RecipientUpdate';

import validateAddressStore from './app/validators/AddressStore';
import validateAddressUpdate from './app/validators/AddressUpdate';

import validateDeliveryManStore from './app/validators/DeliveryManStore';
import validateDeliveryManUpdate from './app/validators/DeliveryManUpdate';

import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validatePerfilDeliverymanUpdate from './app/validators/MobilPerfilDeliveryManUpdate';

import AcceptRegulationController from './app/controllers/AcceptRegulationController';
const routes = new Router();
const upload = multer(multerConfig);

/**
 * validar email do user
 *
 */

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.put('/accept_regulation', AcceptRegulationController.update);
routes.post('/deliveryman/sessions', DeliveryManSessionController.store);

routes.use(AuthMiddleware);

/**
 * criar user
 */

routes.get('/users', UserController.index);
routes.post('/users', validateUserStore, UserController.store);
routes.put('/users', validateUserUpdate, UserController.update);
routes.delete('/users/:id', UserController.delete);

//rota para o deliveryMan retirar a encomenda
routes.post('/orders/:id/withdraw', DeliveryManOrderController.store);

//rota para o deliveryman listar as encomenda
routes.get('/deliveryman/:id/orders', DeliveryManOrderStatusController.index);

//rota para listar entregas por deliveryman que não foram feitas
routes.get('/deliveryman/:id/pending', DeliveryManAllOrderController.index);

//rota para listar encomenda entregas por deliveryman
routes.get('/deliveryman/:id/deliveries', OrderDeliveredController.index);
//rota para alterar o perfil do deliveryman, pelo mobil
routes.put(
  '/deliveryman/:id/profile',
  validatePerfilDeliverymanUpdate,
  ProfileController.update
);

//rota para deliveryman entrega com sucesso, finaliza a entrega
routes.put(
  '/orders/:id/subscriptions',
  upload.single('file'),
  OrderDeliveredController.update
);

//Mobil route DashBoard
//rota para o deliveryman fazer a devolução da encomenda
routes.delete(
  '/orders/:id/cancelwithdraw',
  OrderCancelWithdrawController.delete
);

//Mobil route DeliveryProblem id_order
routes.get('/delivery/:order_id/problems', DeliveryProblemController.index);
//Mobil route DeliveryProblem
routes.post('/delivery/:order_id/problems', DeliveryProblemController.store);
//web
routes.get('/problems', ProblemController.index);
//cancelar uma entrega baseado no ID do problema
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

/**
 * cad recipient e edit
 */
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  validateRecipientUpdate,
  RecipientController.update
);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/addresses/:recipient_id', AddressController.index);
routes.post('/addresses', validateAddressStore, AddressController.store);
routes.put('/addresses/:id', validateAddressUpdate, AddressController.update);

//rota para escolher o endereço principal
routes.put('/address_man/:newId', AddressManController.update);

/*
 * Delivermany
 */

/**
 * select
 */

//rota para preencher os select city
routes.get('/cities/:state_id/select', SelectCityController.index);
//rota para preencher os select city
routes.get('/cities/:state_id/select/edit', SearchCityController.index);
//rota para preencher os select deliveryman
routes.get('/states/select', SelectStateController.index);

//rota para preencher os select recipient
routes.get('/recipients/select', SelectRecipientController.index);
//rota para preencher os select recipient
routes.get('/recipients/:id', SearchRecipientController.index);

//rota para preencher os select deliveryman
routes.get('/deliverymans/select', DeliveryManEnableController.index);
//busca todos os entregadores ativos somente
routes.get('/deliverymans', DeliveryManController.index);
routes.get('/deliverymans/:id', SearchDeliverymanController.index);
//rota para criar entregador
routes.post(
  '/deliverymans',
  upload.single('file'),
  validateDeliveryManStore,
  DeliveryManController.store
);
//usada para atualizar o entregador
routes.put(
  '/deliverymans/:id',
  upload.single('file'),
  validateDeliveryManUpdate,
  DeliveryManController.update
);
//usada para deletar o entregador, essa roda só desabilitar
routes.delete('/deliverymans/:id', DeliveryManController.delete);
//usada para abilitar o entregado, so abilita
routes.put('/deliverymans/:id/enable', DeliveryManEnableController.update);

/*=================================*/
//gestão de encomendas com status
routes.get('/orders', OrderController.index);
//rotas para o admin cadastrar e editar a encomenda
routes.post('/orders', validateOrderStore, OrderController.store);
routes.get('/orders/:id', OrderSearchController.index);
routes.put('/orders/:id', validateOrderUpdate, OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

/**
 *
 *rota para o deliveryman
 *editar data de retirada
 * finalizar a entrega
 ***/
/**
 *
 *
 */

//lista somente as pessoas, com nome e email
routes.get('/people', PeopleController.index);
routes.get('/groups', GroupController.index);
routes.post('/groups', GroupController.store);

routes.post('/groups/users', GroupUserController.store);
routes.put('/groups/users/edit', GroupUserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.put('/avatar/:avatar_id', UserAvatarUpdateController.update);

//atualiza foto do perfil no mobil
routes.put('/files/:id', upload.single('file'), FileController.update);

export default routes;
