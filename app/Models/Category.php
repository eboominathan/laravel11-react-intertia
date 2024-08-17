<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name','image_path','status'];

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }
}
