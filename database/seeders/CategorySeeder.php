<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
    {

        // Temporarily disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        // Truncate the categories and sub_categories tables
        DB::table('services')->truncate();
        DB::table('sub_categories')->truncate();
        DB::table('categories')->truncate();

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');


        $data = [
            'AADHAR' => [
                'ADDRESS CHANGE',
                'PVC CARD',
                'BIOMETRIC UPDATE'
            ],
            'Voter ID' => [
                'NEW CARD',
                'ADDRESS CHANGE',
                'PVC CARD',
                'PHOTO CHANGE'
            ],
            'PAN CARD' => [
                'NEW CARD',
                'ADDRESS CHANGE',
                'PVC CARD',
                'PHOTO CHANGE',
                'SIGNATURE CHANGE'
            ],
            'RATION CARD' => [
                'NEW CARD',
                'ADDRESS CHANGE',
                'DUPLICATE CARD',
                'MEMBER ADD',
                'MEMBER DELETE'
            ],
            'PF' => [
                'WITHDRAW',
                'NOMINATION',
                'KYC'
            ],
            'ID CARD PRINT' => [
                'AADHAR',
                'VOTER ID',
                'PAN',
                'OTHERS',
                'RATION CARD'
            ],
            'LAMINATION' => [
                'AADHAR',
                'VOTER ID',
                'PAN',
                'RATION CARD',
                'BIRTH CERTIFICATE'
            ],
            'XEROX' => [],
            'PRINTOUT' => [],
            'PASSPORT' => [],
            'PHOTO' => [],
            'SCHOOL CERTIFICATE' => [],
            'DOCUMENT WRITING' => [],
            'EB' => [],
            'MSME' => []
        ];

        foreach ($data as $category => $subcategories) {
            // Insert the category
            $categoryId = DB::table('categories')->insertGetId([
                'name' => $category,
            ]);

            // Insert the subcategories
            foreach ($subcategories as $subcategory) {
                DB::table('sub_categories')->insert([
                    'category_id' => $categoryId,
                    'name' => $subcategory,
                ]);
            }
        }
    }
}
