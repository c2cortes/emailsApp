<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class HomeController extends Controller
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

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $emails = DB::table('emails')
                    ->select('emails.*', 'users.name as author')
                    ->where('emails.user_id', '=', Auth::id())
                    ->leftJoin('users', 'emails.user_id', '=', 'users.id')
                    ->orderBy('emails.created_at', 'desc')
                    ->paginate(3);
                    
        
        return view('home', ['data' => $emails]);
    }

    public function save($subject, $content) {
        $email = new \App\Email;
        $email->user_id = Auth::id();
        $email->subject = $subject;
        $email->content = $content;
        $email->save();
        return response()->json($email);
    }
}
