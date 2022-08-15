<template>
    <div class="container">
        <div class="row">
            <div class="col text-left">
                <h2> Listado Libros 2</h2>
                <div class="col-md-12">
                    <b-table striped hover :items="books" :fields="fields">
                       
                        <template v-slot:cell(action)=data>
                            <b-button size="sm" variant="primary" @click="editar(data)" >Editar</b-button>
                            <b-button size="sm" variant="danger" @click="editar(data)" >Eliminar</b-button>
                        </template>
                    </b-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            fields: [
                { key: 'titulo', label: 'Titulo' },
                { key: 'nombre', label: 'Nombre' },
                { key: 'action', label: 'Acccion' },
            ],
            books: [],
            dato: '',
        }
    },
    methods: {
        getBooks() {
            const path = process.env.API_URL + '/api/v1.0/books'
            axios.get(path).then((response) => {
                this.books = response.data
            })
                .catch((error) => {
                    console.log(error);
                })
        },
        editar(data){
            console.log(data)
        },
    },
    created() {
        this.getBooks()
    }

}
</script>
