<?php

use Illuminate\Database\Seeder;

class CollectionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Collection::truncate();
        $faker = \Faker\Factory::create();

        for($i = 0; $i < 6; $i++) {
            \App\Collection::create([
                'title' => $faker->sentence(random_int(1, 2)),
                'description' => $faker->sentence(random_int(4,15)),
                'user_id' => random_int(0, 10)
            ]);
        }
    }
}
