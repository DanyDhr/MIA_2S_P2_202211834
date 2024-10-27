package main

import (
	"MIA_2S_P1_202211834/Backend/FileSystem"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Comando struct {
	//json:"peticion"
	Comando string `json:"peticion"`
}

type Respuesta struct {
	ResponseBack string `json:"respuesta"`
	Error        bool   `json:"error"`
}

// Función para procesar comandos

func leerComando(w http.ResponseWriter, r *http.Request) {
	var newComando Comando
	var newRespuesta Respuesta
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Inserte un comando valido")
		newRespuesta.ResponseBack = "Inserte un comando valido"
	}
	json.Unmarshal(reqBody, &newComando)
	newRespuesta.ResponseBack = FileSystem.DividirComando(newComando.Comando)
	fmt.Println(newRespuesta.ResponseBack)
	//Agregar la respuesta a la peticion
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newRespuesta)
}

func main() {
	http.HandleFunc("/command", leerComando)

	fmt.Println("Servidor backend corriendo en http://localhost:3001")
	http.ListenAndServe(":3001", nil)
}
