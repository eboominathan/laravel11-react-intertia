<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Service extends Model implements Auditable
{
    use HasFactory, SoftDeletes;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'date',
        'name',
        'category_id',
        'customer_id',
        'subcategory_id',
        'service_type',
        'service_status',
        'acknowledgement_no',
        'status',
        'payment_status',
        'follower_name',
        'location',
        'comments',
        'created_by',
        'updated_by',
        'deleted_by'
    ];


    public function category()
    {
        return $this->belongsTo(Category::class,'category_id');
    }

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class,'subcategory_id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function deletedBy()
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }

}
