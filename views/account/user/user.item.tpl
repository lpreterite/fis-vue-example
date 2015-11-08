<form v-on:submit="save($event)">
    <input type="hidden" name="id" v-model="user.id">
    <p>
        <label>名称</label>
        <input type="text" name="name" v-model="user.name">
    </p>
    <p>
        <label>性别</label>
        <input type="text" name="sex" v-model="user.sex">
    </p>
    <p>
        <label>爱好</label>
        <!-- 数据绑定使用v-bind:props -->
        <selection name="tags" :model.sync="user.tags" :tags="tags" style="width:400px"></selection>
    </p>
    <p>
        <button>提交</button>
    </p>
</form>

<div>
    <h3>{% user.name %} <small>{% user.sex == '男'? '♂':'♀' %}</small></h3>
    <p>
        <label v-for="id in user.tags" style="margin-right:10px">{% tags | find id | value 'text' %}</label>
    </p>
</div>