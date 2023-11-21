<template>
  <v-app>
    <!-- <v-layout class="rounded rounded-md"> -->
    <v-app-bar :elevation="0" class="bg-primary-darken-2">
      <v-img class="mx-2" :src="logo" max-height="40" max-width="40" contain></v-img>

      <v-appbar-title class="ml-2 text-h4"><span class="text-secondary">How</span><span
          class="text-accent font-weight-bold">DO</span></v-appbar-title>

      <template v-slot:append>
        <v-btn variant="plain" href="https://adamrice.dev" target="_blank">Blog</v-btn>
        <div v-if="clientPrincipal.clientPrincipal">
          <v-btn variant="plain" href="/logout">Sign out</v-btn>
          <v-btn variant="plain" href="/profile">Profile</v-btn>
        </div>
        <div v-else>
          <!-- <v-btn variant="plain" href="/signup">Sign up</v-btn> -->
          <v-btn variant="plain" href="/login">Sign in</v-btn>
        </div>
      </template>
    </v-app-bar>

    <!-- <v-main style="min-height: 100vh" class=""> -->
    <v-main>
      <template v-if="clientPrincipal.clientPrincipal">
        <v-container class="mb-6" style="max-width: 600px">
          <v-row no-gutters style="height: 150px;">
            <v-col align-self="center" align="center">
              <v-text-field style="width: 100%" label="" variant="outlined" rounded="xl" v-model="todoDesc"
                @keyup.enter="createTodo"></v-text-field>
            </v-col>
          </v-row>
          <v-row align="start" no-gutters>
            <v-col>
              <!-- <v-card class="mx-auto" max-width="600"> -->
              <v-sheet class="mx-auto">
                <v-list class="bg-teal-lighten-5">
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
      </template>
      <template v-else>

        <v-container fluid class="bg-primary-darken-2">
          <v-row justify="center" no-gutters>
            <v-col sm="12" md="4">
              <v-sheet class="ma-2 pa-2 bg-primary-darken-2">
                <h2 class="text-h2 my-6">Getting stuff done starts with a list</h2>
                <v-img class="d-flex d-md-none mx-2" src="src/assets/Mobile note list-pana.png" max-width="450"
                  contained></v-img>
                <p class="text-h5 my-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore
                  et
                  dolore magna aliqua.</p>
                <v-btn elevation="0" variant="outlined" color="secondary" size="x-large" class="my-3">Get started for
                  free</v-btn>
              </v-sheet>
            </v-col>
            <v-col md="4" class="d-none d-md-block">
              <v-img class="mx-2" src="src/assets/Mobile note list-pana.png" max-width="500" contained></v-img>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="my-12 bg-surface">
          <v-row justify="center">
            <v-col xs="12" sm="8" class="">
              <h1 class="text-h2 text-center text-primary-darken-2">Features</h1>
              <h5 class="text-h6 text-center">Boost productivity, reduce stress, and stay organized with HowDO. Prioritize
                tasks, meet deadlines, and achieve goals effortlessly. Your path to success starts with simple, efficient
                planning.</h5>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">


            <v-col cols="12" md="4">
              <v-sheet class="ma-2 pa-2">
                <h1 class="text-h1 my-4">🚀</h1>
                <h1 class="text-h4 text-primary-darken-2">Boost Your Productivity</h1>
                <p class="text-h6 my-6">Say goodbye to chaos and hello to order! With HowDO, unleash the power of
                  organization at your fingertips. Effortlessly manage your tasks and skyrocket your productivity like
                  never before.</p>
              </v-sheet>
            </v-col>

            <v-col cols="12" md="4">
              <v-sheet class="ma-2 pa-2">
                <h1 class="text-h1 my-4">🧘‍♀️</h1>
                <h2 class="text-h4 text-primary-darken-2">Reduce Stress</h2>
                <p class="text-h6  my-6">Unclutter your mind and find peace in the chaos. HowDO helps you prioritize,
                  ensuring that you tackle the most important tasks first. As you check items off your list, watch stress
                  melt away, making room for joy and accomplishment.</p>
              </v-sheet>
            </v-col>

            <v-col cols="12" md="4">
              <v-sheet class="ma-2 pa-2">
                <h1 class="text-h1 my-4">📈</h1>
                <h2 class="text-h4 text-primary-darken-2">Achieve Your Dreams</h2>
                <p class="text-h6 my-6">Turn your dreams into reality with the help of HowDO. Set clear, actionable goals,
                  and witness your progress daily. No goal is too big when you break it down into manageable tasks!</p>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="bg-surface pb-15">
          <h1 class="text-h2 text-center text-primary-darken-2">Pricing Plans</h1>
          <!-- <v-row justify="center" class="mx-16 px-16"> -->
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-card border rounded elevation="4" class="fill-height ma-2 pa-2 d-flex flex-column">
                <h2 class="text-h5 align-center justify-center text-center">Free</h2>
                <h2 class="text-h3 align-center justify-center text-center">£0<span class="text-h6"> / mo</span></h2>
                <!-- <v-list lines="one">
                  <v-list-item v-for="n in 3" :key="n" :title="'Item ' + n">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                </v-list> -->
                <v-list>
                  <v-list-item title="Create, edit, and delete tasks.">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Due Dates and Reminders">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Categories and Tags">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                </v-list>
                <v-spacer></v-spacer>
                <v-card-actions class="justify-center">
                  <v-btn elevation="0" variant="flat" color="secondary" size="x-large" class="my-3">Get started
                    now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card border rounded elevation="4" class="fill-height ma-2 pa-2 d-flex flex-column">
                <h2 class="text-h5 align-center justify-center text-center">Standard</h2>
                <h2 class="text-h3 align-center justify-center text-center">£2.49<span class="text-h6"> / mo</span></h2>
                <v-list>
                  <v-list-item title="Create, edit, and delete tasks.">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Due Dates and Reminders">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Categories and Tags">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Share tasks with others and collaborate on projects in real-time.">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                </v-list>
                <v-spacer></v-spacer>
                <v-card-actions class="justify-center">
                  <v-btn elevation="0" variant="flat" color="secondary" size="x-large" class="my-3">Get started
                    now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card border rounded elevation="4" class="fill-height ma-2 pa-2 d-flex flex-column">
                <h2 class="text-h5 align-center justify-center text-center">Premium</h2>
                <h2 class="text-h3 align-center justify-center text-center">£5.99<span class="text-h6"> / mo</span></h2>
                <v-list>
                  <v-list-item title="Create, edit, and delete tasks.">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Due Dates and Reminders">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Categories and Tags">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Share tasks with others and collaborate on projects in real-time">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Sync Across Devices">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Notes and Attachments">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                  <v-list-item title="Assign priority levels to tasks">
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check" color="secondary"></v-icon>
                    </template>
                  </v-list-item>
                </v-list>
                <v-spacer></v-spacer>
                <v-card-actions class="justify-center">
                  <v-btn elevation="0" variant="flat" color="secondary" size="x-large" class="my-3">Get started
                    now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>



      <v-footer class="bg-secondary text-center d-flex flex-column mt-16">
        <div>
          <v-btn class="mx-4" icon="mdi-facebook" variant="text"></v-btn>
          <v-btn class="mx-4" icon="mdi-twitter" variant="text"></v-btn>
          <v-btn class="mx-4" icon="mdi-linkedin" variant="text"></v-btn>
          <v-btn class="mx-4" icon="mdi-instagram" variant="text"></v-btn>
        </div>

        <div class="pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut
          risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.
          Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices,
          cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </div>

        <v-divider></v-divider>

        <div>
          © {{ new Date().getFullYear() }} — <strong>HowDO</strong>
        </div>
      </v-footer>


    </v-main>


    <!-- </v-layout> -->
    <!-- {{ clientPrincipal }} -->
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import logo from '@/assets/logo.png'

var todoDesc = ref("");
var items = ref([]);
var clientPrincipal = ref("");

// Use the onMounted hook to run code when the component is mounted
onMounted(async () => {

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

  items.value.ord;

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