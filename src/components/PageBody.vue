<template>
  <q-page>
    <!--<a v-for="item in categories" :key="item">{{item}}</a>-->
    <div>
      <div class="q-gutter-y-md">
        <q-card>
          <q-tabs
            v-model="currentTab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="allCategories" label="All categories" />
            <q-tab name="randomJoke" label="Random joke" />
            <q-tab name="freeText" label="freetext" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="currentTab" animated>
            <q-tab-panel name="allCategories">
              <div class="row justify-center">
                <div class="col-12 q-ma-lg q-pa-lg">
                  <div class="row justify-center">
                    <div
                      class="col q-ma-sm"
                      v-for="category in categories"
                      :key="category"
                    >
                      <q-btn class="btn-style" @click="printJoke(category)">{{
                        category
                      }}</q-btn>
                    </div>
                    <div class="col-12 quote-box q-ma-lg q-pa-lg">
                      <p>
                        {{ joke.value }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="randomJoke">
              <div class="row justify-center">
                <div class="col-12 q-ma-lg q-pa-lg">
                  <div class="row justify-center">
                    <div class="col-1">
                      <div>
                        <q-btn id="btn-random-joke" class="q-ma-sm" @click="printRandomJoke">Get random joke</q-btn>
                      </div>
                    </div>
                      <div class="col-12 quote-box q-ma-lg q-pa-lg">
                        <p>
                          {{ randomJoke.value }}
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="freeText">
              <div class="row justify-center">
                <div class="col-12 q-ma-lg q-pa-lg">
                  <div class="row justify-center">
                    <div class="col-8">
                      <q-input @keyup.enter="fetchJokeByUserInput" square outlined v-model="userInput" label="Search joke" />
                    </div>
                    <div class="col-12 quote-box q-ma-lg q-pa-lg">
                      <p>
                        {{ searchJokeResult }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style></style>

<script lang="ts">
import {
  fetchAllCategories,
  fetchRandomJoke,
  fetchJokeByCategory,
  fetchJokeByFreeText
} from "@/helpers/http";
import { onMounted, ref, reactive } from "vue";
import type { Ref } from "vue";
import type { AxiosResponse } from "axios";
import type { IJoke } from "@/interfaces/IJoke";
import { AxiosError } from "axios";
export default {
  setup() {
    const currentTab = ref("allCategories");
    const userInput = ref('')
    let categories: Ref<string | AxiosResponse> = ref("");
    let joke: Ref<string | IJoke> = ref({
      icon_url: "",
      id: "",
      url: "",
      value: "",
    });
    let randomJoke: Ref<string | IJoke> = ref({
      icon_url: "",
      id: "",
      url: "",
      value: "",
    });

    let searchJokeResult = ref('');
    onMounted(async () => {
      await fetchData();
    });

    function fetchData(): void {
      fetchAllCategories().then((res) => {
        categories.value = res;
      });
    }

    function printJoke(category: string): void {
      fetchJokeByCategory(category).then((res) => {
        joke.value = res;
      });
    }

    function printRandomJoke(): void {
      fetchRandomJoke().then((res) => {
        randomJoke.value = res;
      });
    }

   function parseAndReturnFirstJoke(jokes: IJoke[]): string{
      return jokes[0].value;
    }

    function fetchJokeByUserInput(): void{
      const payload = userInput.value as unknown as string;
      fetchJokeByFreeText(payload).then((res) => {
        console.log('type',  res);
        if(res === 400){
          searchJokeResult.value = 'Error: No entry was found'
        }else {
        const result = res as unknown as IJoke[]
        const firstResult = parseAndReturnFirstJoke(result);
        searchJokeResult.value = firstResult;
        }
      })
    }
    return {
      currentTab,
      categories,
      printJoke,
      joke,
      randomJoke,
      printRandomJoke,
      userInput,
      fetchJokeByUserInput,
      searchJokeResult

    };
  },
};
</script>
<style>
.btn-style {
  background: #ff0080 !important;
  color: white !important;
  max-width: 5vw !important;
  min-width: 5vw !important;
}

.quote-box {
  background: #ebdada;
  text-align: center;
  min-height: 10vh;
  min-width: 100%;
}

#btn-random-joke{
  background: goldenrod!important;
  color: white!important;
}
</style>
