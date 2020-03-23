<template>
  <div>
    <h1>vue-resumable</h1>

    <div>
      <vue-resumable
        inputId="file"
        name="up1-name"
        :multiple="true"
        :directory="false"
        post-action="http://localhost:3000/upload"
        :promptly="false"
        requestType="formdata"
        :thread="2"
        @change="change()"
        :data="uploadData"
        ref="resumable"
      ></vue-resumable>

      <div class="img-list">
        <img v-for="(img, index) in imgList" :key="index" :src="img.url" width="150" />
      </div>

    <div>
      <button class="upload-file-btn" @click="upload">UPLOAD-FILE</button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      imgList: [],
      fileList: [],
      uploadData: { 
        memberId: 1,
        imgFilePath: null,
        imgFileNm: null,
        imgFileSz: null
      }
    };
  },
  methods: {
    change() {
      let vm = this;
      let resumable = this.$refs.resumable;

      resumable.files.forEach(file => {
        if (file.url) vm.imgList.push(file);
      });

      vm.fileList = vm.imgList.map(item => {
        let uploadData = {
          memberId: item.identifier,
          imgFilePath: item.url,
          imgFileNm: item.name,
          imgFileSz: item.size
        };

        return uploadData;
      });
    },
    upload() {
      console.log("App upload");
  
      console.log('this.fileList', this.fileList);
      
      const formData = new FormData();
      formData.append('file', this.fileList[0]);
      
      axios
        .post("http://localhost:3000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          console.log("SUCCESS!!");
        })
        .catch(() => {
          console.log("FAILURE!!");
        });
    }
  }
};
</script>

<style>
.img-list {
  margin-top: 10px;
  overflow: hidden;
}

.img-list .item {
  position: relative;
  float: left;
  height: 122px;
  width: 150px;
  border: 1px solid #cc7832;
  overflow: hidden;
}

.img-list .item img {
  max-height: 122px;
  max-width: 150px;
}

.select-file-btn {
  padding: 5px;
  font-size: 20px;
}

.upload-file-btn {
  padding: 5px;
  font-size: 20px;
}
</style>
