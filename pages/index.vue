<template>
  <v-container>
    <v-tabs v-model="tab" background-color="grey lighten-4" centered class="grey--text mb-5">
      <v-tab v-for="t of tabs" :key="t.name">
        {{ t.name }}
      </v-tab>
    </v-tabs>

    <v-card
      v-for="todo of todos"
      :key="todo.title"
      flat
      tile
      width="700"
      class="d-flex mb-4 mx-auto"
    >
      <v-card-actions>
        <v-icon class="c-p">
          mdi-checkbox-blank-outline
        </v-icon>
      </v-card-actions>
      <v-card-title class="text-truncate font-weight-bold text-subtitle-2">
        {{ todo.title }}
      </v-card-title>
      <v-spacer />
      <v-card-actions class="text-right">
        <v-icon color="red" class="c-p">
          mdi-heart-outline
        </v-icon>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      tab: 0,
      tabs: [
        { name: '全て' },
        { name: '未完了' },
        { name: '完了' }
      ],
      todos: [
        { title: '食器を洗う', completed: true, like: true },
        { title: '洗濯物をする', completed: false, like: false }
      ]
    }
  }
}
</script>
