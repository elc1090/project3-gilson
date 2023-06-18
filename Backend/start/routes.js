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
    //Route.resource("pathologies", "Admin/PathologyController").apiOnly();
    //Route.resource("patients", "Admin/PatientController").apiOnly();
    //Route.resource("diagnoses", "Admin/DiagnosisController").apiOnly();
    //Route.resource("demands", "Admin/DemandController").apiOnly();
}).prefix("users");

Route.group(() => {
    Route.resource("patients", "Psychologist/PatientController").apiOnly();
    //Route.resource("pathologies", "Admin/PathologyController").apiOnly();
    //Route.resource("patients", "Admin/PatientController").apiOnly();
    //Route.resource("diagnoses", "Admin/DiagnosisController").apiOnly();
    //Route.resource("demands", "Admin/DemandController").apiOnly();
}).prefix("psychologists");
