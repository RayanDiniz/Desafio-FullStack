<?php

namespace App\Http\Controllers;

use App\Models\Desenvolvedores;
use App\Models\Nivel;
use Illuminate\Http\Request;

class ApiController extends Controller
{
//Endpoints
    //Endpoints dos Niveis
    public function getAllNivel(Request $request) {
        $query = Nivel::query();
        if ($request->has('nivel')) {
            $query->where('nivel', 'LIKE', '%' . $request->nivel . '%');
        }        
        $nivel = $query->paginate(150);
        if($nivel->total() == 0) {
            return response()->json([
                "code" => 200,
                "info" => "error",
                "message" => "Nenhum nivel encontrado"
            ], 200);
        }else{
            return response($nivel, 200);
        }
    }
    public function getNivel($id) {
        if(Nivel::where('id', $id)->exists()) {
            $nivel = Nivel::where('id', $id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($nivel, 200);
        } else {
            return response()->json([
                "message" => "Nivel não encontrado"
            ], 400);
        }
    }
    public function createNivel(Request $request) {
        try {
            $nivel = new Nivel;
            $nivel->nivel = $request->nivel;
            $nivel->save();
    
            return response()->json([
                "code" => 201,
                "info" => "success",
                "message" => "Nivel criado com sucesso."
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "code" => 401,
                "info" => "error",
                "message" => "Não foi possível cadastrar este nivel."
            ], 401);
        }
    }
    public function updateNivel(Request $request, $id) {
        if (Nivel::where('id', $id)->exists()) {
            $nivel = Nivel::find($id);
            $nivel->nivel = is_null($request->nivel) ? $nivel->nivel : $request->nivel;
            $nivel->save();

            return response()->json([
                "code" => 200,
                "info" => "success",
                "message" => "Nivel atualizado com secesso!"
            ], 200);
        } else {
            return response()->json([
                "code" => 400,
                "info" => "error",
                "message" => "Nivel não encontrado."
            ], 400);
        }
    }
    public function deleteNivel($id) {
        try {
            if (Nivel::where('id', $id)->exists()) {
                $nivel = Nivel::find($id);
                $nivel->delete();

                return response()->json([
                    "code" => 204,
                    "info" => "success",
                    "message" => "Nivel deletado com sucesso!"
                ], 204);
            } else {
                return response()->json([
                    "code" => 400,
                    "info" => "error",
                    "message" => "Nivel não encontrado"
                ], 400);
            }
        } catch (\Exception $e) {
            return response()->json([
                "code" => 401,
                "info" => "error",
                "message" => "Não é possível remover um nível associado a um desenvolvedor."
            ], 401);
        }
    }

    //Endpoints dos Desenvolvedores
    public function getAllDevs(Request $request) {
        $query = Desenvolvedores::query()->with('nivel');
        if($request->has('nome')) {
            $query->where('nome', 'LIKE', '%' . $request->nome . '%');
        }
        $dev = $query->paginate(150);
        if($dev->total() == 0) {
            return response()->json([
                "code" => 200,
                "info" => "error",
                "message" => "Nenhum dev encontrado"
            ], 200);
        }else{
            return response()->json([$dev], 200);
        }
    }
    public function getDev($id) {
        if(Desenvolvedores::where('id', $id)->exists()) {
            $dev = Desenvolvedores::where('id', $id)->with('nivel')->get();
            return response()->json([$dev], 200);
        } else {
            return response()->json([
                "message" => "Desenvolvedor não encontrado"
            ], 400);
        }
    }
    public function createDev(Request $request) {
        try{
            $dev = new Desenvolvedores;
            $dev->nivel_id = $request->nivel_id;
            $dev->nome = $request->nome;
            $dev->sexo = $request->sexo;
            $dev->datanascimento = $request->datanascimento;
            $dev->idade = $request->idade;
            $dev->hobby = $request->hobby;
            $dev->save();
            if($dev){
                return response()->json([
                    "code" => 201,
                    "info" => "success",
                    "message" => "Desenvolvedor criado com sucesso!",
                ], 201);
            }else{
                return response()->json([
                    "code" => 401,
                    "info" => "error",
                    "message" => "Desenvolvedor não cadastrado!",
                ], 401);
            }
        } catch (\Exception $e) {
            if($e){
                return response()->json([
                    "code" => 501,
                    "info" => "error",
                    "message" => "Não é possível cadastrar um desenvolvedor com niveis inexistente."
                ], 501);
            }else{
                return response($e);
            }
        }
    }
    public function updateDev(Request $request, $id) {
        if(Desenvolvedores::where('id', $id)->exists()) {
            $dev = Desenvolvedores::find($id);
            $dev->nivel_id = is_null($request->nivel_id) ? $dev->nivel_id : $request->nivel_id;
            $dev->nome = is_null($request->nome) ? $dev->nome : $request->nome;
            $dev->sexo = is_null($request->sexo) ? $dev->sexo : $request->sexo;
            $dev->datanascimento = is_null($request->datanascimento) ? $dev->datanascimento : $request->datanascimento;
            $dev->idade = is_null($request->idade) ? $dev->idade : $request->idade;
            $dev->hobby = is_null($request->hobby) ? $dev->hobby : $request->hobby;
            $dev->save();

            return response()->json([
                "code" => 200,
                "info" => "success",
                "message" => "Desenvolvedor atualizado com sucesso!"
            ], 200);
        } else {
            return response()->json([
                "code" => 400,
                "info" => "error",
                "message" => "Desenvolvedor não encontrado."
            ], 400);
        }
    }
    public function deleteDev($id) {
        if(Desenvolvedores::where('id', $id)->exists()) {
            $dev = Desenvolvedores::find($id);
            $dev->delete();

            return response()->json([
                "code" => 200,
                "info" => "success",
                "message" => "Desenvolvedor deletado com sucesso."
            ], 200);
        } else {
            return response()->json([
                "code" => 400,
                "info" => "error",
                "message" => "Desenvolvedor não encontrado."
            ], 400);
        }
    }
}
