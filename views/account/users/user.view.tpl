<table>
    <thead>
        <tr>
            <th>No.</th>
            <th>UID</th>
            <th>名称</th>
            <th>性别</th>
        </tr>
    </thead>
    <tbody>
        <tr v-if="$loadingRouteData"><td colspan="4">loading...</td></tr>
        <template v-if="!$loadingRouteData">
            <tr v-for="user in users" track-by="id">
                <td>Nr.{%$index%}</td>
                <td>{%user.id%}</td>
                <td><a v-link="'/account/user/'+user.id">{%user.name%}</a></td>
                <td>{%user.sex%}</td>
                <td>
                    <a href="javascript:void('set display');" v-on:click="display(user)">{% user.is_display ? '不显示':'显示' %}</a>
                    <a href="javascript:void('delete');" v-on:click="del(user)">删除</a>
                </td>
            </tr>
            <tr v-if="users.length<=0">
                <td colspan="4">暂无用户</td>
            </tr>
        </template>
    </tbody>
</table>