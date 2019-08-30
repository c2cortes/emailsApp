<?php

namespace App\Http\Controllers;

class EmailsController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index(){
        return view('emails.index');
    }

    public function save($subject, $content) {
        $email = new \App\Email;
        $email->user_id = 1;
        $email->subject = $subject;
        $email->content = $content;
        $email->save();
        die();
    }
}