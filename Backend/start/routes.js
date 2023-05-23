"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

Route.get("users/:id", "UserController.show").middleware("auth");
Route.post("login", "UserController.login");

Route.get('/pathologies', 'PathologyController.index');
Route.post('/pathologies', 'PathologyController.store');

Route.get('/patients', 'PatientController.index');
Route.post('/patients', 'PatientController.store');

Route.get('/diagnoses', 'DiagnosisController.index');
Route.post('/diagnoses', 'DiagnosisController.store');

Route.get('/demands', 'DemandController.index');
Route.post('/demands', 'DemandController.store');
