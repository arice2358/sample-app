<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-img class="mx-2" src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
        max-height="40" max-width="40" contain></v-img>

      <v-toolbar-title class="ml-2">
        My App
      </v-toolbar-title>

      <template v-slot:append>
        <v-btn variant="plain" href="https://adamrice.dev" target="_blank">Blog</v-btn>
        <div v-if="clientPrincipal.clientPrincipal">
          <v-btn variant="plain" href="/logout">Sign out</v-btn>
          <v-btn variant="plain" href="/profile">Profile</v-btn>
        </div>
        <div v-else>
          <v-btn variant="plain">Sign up</v-btn>
          <v-btn variant="plain" href="/login">Sign in</v-btn>
        </div>
      </template>
    </v-app-bar>

    <v-main style="min-height: 300px">
      <div v-if="clientPrincipal.clientPrincipal">
        <v-container class="mb-6">
          <v-row no-gutters style="height: 150px;">
            <v-col align-self="center" align="center">
              <v-text-field style="width: 600px" label="" variant="outlined" rounded="xl" v-model="todoDesc"
                @keyup.enter="createTodo"></v-text-field>
            </v-col>
          </v-row>
          <v-row align="start" no-gutters>
            <v-col>
              <!-- <v-card class="mx-auto" max-width="600"> -->
                <v-sheet class="mx-auto" :width="600">
                <v-list>
                  <v-list-item v-for="(item, index) in items" :key="item.id">
                    <template v-slot:prepend>
                      <v-list-item-action start>
                        <v-checkbox-btn color="success" :model-value=item.completed
                          @click="completeTodo(item)"></v-checkbox-btn>
                      </v-list-item-action>
                    </template>

                    <v-list-item-title @blur="changed(item)" @keypress.enter="changed(item)" :id="item.id"
                      :class="{ linethrough: item.completed }">{{ item.description }}</v-list-item-title>

                    <template v-slot:append>
                      <v-btn :id="'btnEdit' + index" color="grey-lighten-1" icon="mdi-pencil" variant="text"
                        @click="editTodo(item)" @mousedown="stopBlur($event)"></v-btn>
                      <v-btn color="grey-lighten-1" icon="mdi-close" variant="text" @click="deleteTodo(item)"></v-btn>
                    </template>

                  </v-list-item>
                </v-list>
                </v-sheet>
              <!-- </v-card> -->
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else>
        <h1>Login to add todos</h1>        
      </div>
    </v-main>
  </v-layout>
  {{ clientPrincipal }}
</template>

<script setup>
import { ref, onMounted } from "vue";

var todoDesc = ref("");
var items = ref([]);
var clientPrincipal = ref("");

// Use the onMounted hook to run code when the component is mounted
onMounted(async () => {
  console.log('Component is mounted');

  const response = await fetch('/.auth/me');
  const payload = await response.json();
  clientPrincipal.value = payload;

  if (clientPrincipal.value.clientPrincipal != null) {
    await listTodos();
  }
});

// if the edit button is clicked to save changes to an item, we don't want to the blur event to fire as well
async function stopBlur(e) {
  console.log("mouseDown: " + e);
  e.preventDefault();
}

async function changed(item) {
  console.log("changed " + item.id);
  console.log(document.activeElement);

  var todoElem = document.getElementById(item.id)
  if (todoElem.getAttribute("contenteditable")) {
    todoElem.removeAttribute("contenteditable");
    item.description = todoElem.textContent;
    updateTodo(item);
  }
}

async function editTodo(item) {
  console.log("editTodo: " + item.id);
  var todoElem = document.getElementById(item.id)

  var todoElem = document.getElementById(item.id)

  if (todoElem.getAttribute("contenteditable")) {
    todoElem.removeAttribute("contenteditable");
    item.description = todoElem.textContent;
    updateTodo(item);
  }
  else {
    todoElem.setAttribute("contenteditable", true);
    document.getElementById(item.id).focus();
  }
}

async function createTodo(event) {
  const endpoint = "/api/todos";

  var item = {
    description: todoDesc.value
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  });

  todoDesc.value = '';

  await listTodos();
}

async function listTodos() {
  const endpoint = "/api/todos";
  const response = await fetch(endpoint, {
    method: "GET",
  });

  const result = await response.json();
  items.value = result;
  console.table(result);
}

async function deleteTodo(item) {
  console.log("delete todo: " + item.id);
  const endpoint = "/api/todos/" + item.id;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });
  await listTodos();
}

async function updateTodo(item) {
  console.log("update todo: " + item.id);

  // call API to store updated item
  const endpoint = "/api/todos/" + item.id;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  });

  await listTodos();
}

async function completeTodo(item) {
  console.log("complete todo: " + item.id);
  console.log("completed: " + item.completed);
  if (item.completed) {
    document.getElementById(item.id).classList.remove("linethrough");
    item.completed = false;
  }
  else {
    document.getElementById(item.id).classList.add("linethrough");
    item.completed = true;
  }

  // call API to store updated item
  const endpoint = "/api/todos/" + item.id;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  });

  await listTodos();
}

</script>

<style>
/* Strikethrough */

.linethrough {
  text-decoration: line-through;
  transition: text-decoration 5s;
}


.strikethrough {
  display: inline-block;
  position: relative;
  transition: all 2s cubic-bezier(.55, 0, .1, 1);
}

.strikethrough:after {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  box-shadow: 0 1px rgba(255, 255, 255, 0.6);
  margin-top: -0.7em;
  background: black;
  transform-origin: center left;
  animation: strikethrough 1s 0.5s cubic-bezier(.55, 0, .1, 1) 1;
  transition: transform 0.5s cubic-bezier(.55, 0, .1, 1);
}

@keyframes strikethrough {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

div[contenteditable="true"] {
  /* border: solid black 1px; */
}
</style>