<section id="task-list">
    <header>
        <h1 :class="{animation: !$loadingRouteData}">任务清单</h1>
    </header>
    <article>
        <ul class="tasks">
            <li v-show="$loadingRouteData" class="text-center">loading...</li>
            <li v-else v-for="task in tasks" transition="taskItem">
                <task-item :data="task" :is-news="false" @remove="removeItem"></task-item>
            </li>
            <li v-show="!$loadingRouteData">
                <p v-if="state.ui=='static'" class="text-right"><a class="pure-button ui-slick ui-sm" href="javascript:void('add task');" @click="render('create')">添加任务</a></p>
                <task-item v-ref:creator v-show="state.ui=='create'" @saved="create" @display="render('static')"></task-item>
            </li>
        </ul>
    </article>
</section>