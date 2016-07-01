<section id="task-list">
    <h1>任务清单</h1>
    <hr>
    <ul class="tasks">
        <li v-if="$loadingRouteData">loading...</li>
        <li v-else v-for="task in tasks">
            <task-item :data="task" @remove="removeItem"></task-item>
        </li>
    </ul>
</section>