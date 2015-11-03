<h1>登录</h1>

<form v-on="submit: signin($event)">
    <label for="name">账号</label>
    <input type="text" name="name" id="name" v-model="form.name">
    <label for="password">密码</label>
    <input type="password" name="password" id="password" v-model="form.password">
    <button>登录</button>
</form>

<p>{% message %}</p>

<div>
    user: admin <br>
    pass: 123456
</div>