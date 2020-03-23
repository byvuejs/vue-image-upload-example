<template>
  <div>
    <h1>vue-upload-component</h1>

    <div class="upload">
      <ul>
        <li v-for="file in files" :key="file.id">
          <span>{{ file.name }}</span> -
          <span>{{ file.size }}</span> -
          <span v-if="file.error">{{ file.error }}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else-if="file.active">active</span>
          <span v-else></span>
        </li>
      </ul>

      <div>
        <file-upload
          class="btn btn-primary"
          post-action="http://localhost:3000/upload"
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png, image/gif, image/jpeg, image/webp"
          :multiple="true"
          :size="1024 * 1024 * 10"
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload"
        >
          <i class="fa fa-plus"></i>
          Select files
        </file-upload>

        <button
          type="button"
          class="btn btn-success"
          v-if="!$refs.upload || !$refs.upload.active"
          @click.prevent="$refs.upload.active = true"
        >
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Start Upload
        </button>

        <button
          type="button"
          class="btn btn-danger"
          v-else
          @click.prevent="$refs.upload.active = false"
        >
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import FileUpload from "vue-upload-component";

export default {
  components: {
    FileUpload
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
      }
    },
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        console.log("add", newFile);
      }
      if (newFile && oldFile) {
        // update
        console.log("update", newFile);
      }
      if (!newFile && oldFile) {
        // remove
        console.log("remove", oldFile);
      }
    }
  }
};
</script>
