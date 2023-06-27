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
Route.post("login", "UserController.login");

Route.group(() => {
  Route.resource("psychologists", "Admin/PsychologistController").apiOnly();
}).prefix("users");

Route.group(() => {
  Route.resource("patients", "Psychologist/PatientController").apiOnly();
  Route.resource(
    "appointments",
    "Psychologist/AppointmentController"
  ).apiOnly();

  Route.post(
    "patients/:patient_id/appointments",
    "Psychologist/AppointmentController.store"
  );
}).prefix("psychologists");
