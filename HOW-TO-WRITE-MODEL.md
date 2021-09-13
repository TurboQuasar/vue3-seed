## 这里我们使用了相关插件来修改接口原始数据来匹配页面展示,我们尽量在model里做接口数据处理，而不是把这部分任务放在setup中
- [models](./src/models)
- [typescript-json-serializer](https://github.com/GillianPerard/typescript-json-serializer)
- [swagger](http://172.16.100.33:8082/rest/swagger-ui/index.html)
## 分页部分有些特殊，不能完全继承，需要我们手动添加data，具体参考page相关model

