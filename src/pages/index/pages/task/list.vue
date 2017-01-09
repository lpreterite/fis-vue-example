<template>
	<section id="task-list" __vuec__>
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
</template>

<script>
	var task = require('models/task.model')

	module.exports = {
	    name: "task_list",
	    data: function(){
	        return {
	            tasks: [],
	            state: {
	                ui: 'static'
	            }
	        }
	    },
	    route: {
	        data: function(transition){

	            setTimeout(function(){
	                transition.next({
	                    tasks: task.fetch()
	                })
	            }, 1000)

	            // return {
	            //     tasks: task.fetch()
	            // }
	        }
	    },
	    methods: {
	        removeItem: function(task){
	            this.tasks.$remove(task)
	        },
	        create: function(data){
	            this.tasks.push(data)
	            this.$refs.creator.clear()
	            this.$refs.creator.render('editing')
	        },
	        render: function(state){
	            var state = typeof state == "undefined" ? 'static' : state
	            switch(this.state.ui = state){
	                case 'static':
	                    break;
	                case 'create':
	                    this.$refs.creator.render('editing')
	                    break;
	            }
	        }
	    },
	    components: {
	        taskItem: require('pages/index/components/taskItem')
	    }
	}
</script>

<style lang="scss">
	#task-list[__vuec__]{
	    > header{
	        background-color: #b0cadb;
	        color: #fff;
	        overflow: hidden;
	        > h1{
	            font-size: 18px;
	            margin: 0.825em;

	            transition: transform .5s;
	            transform: translate(-100%, 0);
	            &.animation{
	                transform: translate(0, 0);
	            }
	        }

	        @media (min-width: 48em) {
	            > h1{
	                font-size: 48px;
	                height: 48px;
	                margin-bottom: 0;
	                margin-top: 2em;
	                overflow-y: hidden;
	            }
	        }
	    }
	    > article{
	        padding: 1em;
	    }
	    > footer{
	        padding: 1em;
	    }
	    .tasks{
	        > li{
	            margin: 10px 0;
	            .label{
	                margin-right: 5px;
	            }
	            .editing{
	                p:last-child{
	                    padding-left: 20px;
	                }
	            }
	        }
	    }

	    .taskItem-transition{
	        transition: opacity .35s ease;
	    }
	    .taskItem-enter{
	        opacity: 1;
	    }
	    .taskItem-leave{
	        opacity: 0;
	        position: absolute;
	        width: 100%;
	    }
	    .taskItem-move{
	        transition: transform .5s ease;
	    }
	}
</style>