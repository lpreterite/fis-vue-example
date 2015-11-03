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
            <tr v-repeat="users">
                <td>Nr.{%$index%}</td>
                <td>{%id%}</td>
                <td>{%name%}</td>
                <td>{%sex%}</td>
            </tr>
            <tr v-if="users.length<=0">
                <td colspan="4">暂无用户</td>
            </tr>
        </template>
    </tbody>
</table>