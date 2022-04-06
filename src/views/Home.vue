<template>
  <div class="home">
    <div class="container">
      <div class="showSkip" v-for="(item, index) in storage.fileList" :key="index">
        <span>{{item.url}}</span>
        <span v-if="item.url">
          <el-button type="success" icon="el-icon-check" @click="typeSelection(item.url)" circle></el-button>
        </span>
      </div>
      <div class="imgUpLoad">
        <!-- before-upload   上传文件之前的钩子 -->
        <el-upload
          class="upload-demo"
          :action="objData.host"
          :before-upload="beUpload"
          :on-success="success"
          :data="objData"
          :file-list="storage.fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <!-- 图片预览 -->
      <el-image-viewer v-if="showViewer" :on-close="showViewerClose" :url-list="[guidePic]"></el-image-viewer>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  data() {
    return {
      showViewer: false,
      guidePic: '', 
      objData: {
        OSSAccessKeyId: '',     //required
        policy: '',             //required
        Signature: '',          //required
        key: '',                //required
        // file: '',            //required
        host: '',
        dir: '', 
        link: ''
      },
    };
  },
  computed: {
    ...mapGetters(['storage'])
  },
  mounted () {

  },
  methods: {
    beUpload (file) {
      let that = this
      return new Promise((resolve, reject) => {
        this.$getOssInfos().then((res) => {
          that.objData.OSSAccessKeyId = res.data.accessid
          that.objData.policy = res.data.policy
          that.objData.Signature = res.data.signature
          that.objData.host = res.data.host   //直传OSS的地址
          that.objData.dir = res.data.dir
          that.objData.key = res.data.dir+"${filename}" //OSS提供的占位符,文件名
          console.log(res);
          console.log('上传参数:', that.objData);
          that.objData.link = that.objData.host+'/' + that.objData.dir + file.name
          console.log(that.objData.host+'/' + that.objData.dir + file.name);
          resolve(true)
        }).catch((err) => {
          console.log(err);
          reject(false)
        })
      })
    },
    success (response, file, fileList) {
      if (!this.storage.fileList) {
        this.saveStorage({key: 'fileList', val: []})
      }
      let fileListData = JSON.parse(JSON.stringify(this.storage.fileList)) //深拷贝
      file.url = this.objData.link
      //查找是否有重复的内容
      let findindex = fileListData.findIndex((val) => {
        return val.url == file.url
      })
      if (findindex != -1) {
        fileListData.splice(findindex, 1)
      } 
      //将新上传的，追加上。
      fileListData.push(file)
      this.saveStorage({key: 'fileList', val: fileListData})
    },
    toVideo (link) {
      this.$router.push({
        path: '/ossVideo',
        query: {
          link
        }
      })
    },
	showViewerClose(){
		this.showViewer = false 
	}, 
	getPreview (url){ 
    this.guidePic = url
		this.guidePic ? this.showViewer = true: this.$message.info('当前没有可预览的图片')
	},
  typeSelection (url) {
    let suffix = url.split('.')[url.split('.').length - 1].toLocaleUpperCase()
    let allImgSuffix = ['BMP','GIF','JPEG','TIFF','PSD','PNG','SWF','SVG','JPG','hsb']
    console.log(suffix);
    //如果是图片则预览，否则当作视频
    if (allImgSuffix.includes(suffix)) {
      this.getPreview(url)
    }else {
      this.toVideo(url) 
    }
  },
    ...mapActions(['saveStorage'])
  },
  components:{ ElImageViewer }
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  .container {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    background-color: pink;
  }
}
</style>