<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource; 
use App\Models\Service;


class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $totalPendingTasks = Service::query()
            ->where('service_status', 'pending')
            ->count();
        $myPendingTasks = Service::query()
            ->where('service_status', 'pending')            
            ->count();


        $totalProgressTasks = Service::query()
            ->where('service_status', 'in_progress')
            ->count();
        $myProgressTasks = Service::query()
            ->where('service_status', 'in_progress')
            ->count();


        $totalCompletedTasks = Service::query()
            ->where('service_status', 'completed')
            ->count();
        $myCompletedTasks = Service::query()
            ->where('service_status', 'completed')
            ->count();

        $activeTasks = Service::query()
            ->whereIn('service_status', ['pending', 'in_progress'])
            ->limit(10)
            ->get();
       
        $activeTasks = ServiceResource::collection($activeTasks);
     
        return inertia(
            'Dashboard',
            compact(
                'totalPendingTasks',
                'myPendingTasks',
                'totalProgressTasks',
                'myProgressTasks',
                'totalCompletedTasks',
                'myCompletedTasks',
                'activeTasks'
            )
        );
    }
}