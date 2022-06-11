<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDesenvolvedoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('desenvolvedores', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('nivel_id')->unsigned();
            $table->foreign('nivel_id')->references('id')->on('nivels');
            $table->string('nome');
            $table->char('sexo');
            $table->date('datanascimento');
            $table->integer('idade');
            $table->string('hobby');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('desenvolvedores');
    }
}
