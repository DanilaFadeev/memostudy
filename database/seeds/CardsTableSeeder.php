<?php

use Illuminate\Database\Seeder;

class CardsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        \App\Card::truncate();

        for($i = 0; $i < 120; $i++) {
            \App\Card::create([
                'title' => $faker->word,
                'details' => $faker->sentence(random_int(3, 6)),
                'img' => $faker->imageUrl(800, 600),
                'collection_id' => random_int(0, 20)
            ]);
        }
    }
}
