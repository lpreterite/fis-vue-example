<section id="task-list">
    <header>
        <h1>任务清单</h1>
        <hr>
    </header>
    <article>
        <ul class="tasks">
            <li v-if="$loadingRouteData">loading...</li>
            <li v-else v-for="task in tasks">
                <task-item :data="task" @remove="removeItem"></task-item>
            </li>
        </ul>
    </article>
    <footer>
        <p v-if="state.ui=='static'"><a href="javascript:void('add task');" @click="render('create')">添加任务</a></p>
        <form v-if="state.ui=='create'" @submit.prevent="create">
            <p>
                <input type="checkbox" v-model="creature.complete" disabled="">
                <input type="text" v-model="title" v-el:input class="form-control">
            </p>
            <p>
                <button type="submit" class="btn"><i class="fa fa-check"></i> 添加任务</button>
                <button type="button" class="btn ui-ghost" @click="render('static')"><i class="fa fa-times"></i> 取消</button>
            </p>
        </form>
    </footer>
</section>