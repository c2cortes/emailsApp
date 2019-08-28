<?php

namespace App\Http\Controllers;

class EmailsController extends Controller
{
    public function index(){
        return view('emails.index');
    }
}