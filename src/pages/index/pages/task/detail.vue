<template>
	<section id="task-detail" __vuec__>
	    <header>
	        <h1 :class="{animation: !$loadingRouteData}">
	            <a href="#" v-link="{name:'index'}"><i class="fa fa-angle-left"></i> 返回</a>
	        </h1>
	    </header>
	    <div :class="state.ui">
	        <template v-if="state.ui=='static'">
	            <div class="text-center" v-if="$loadingRouteData">loading...</div>
	            <template v-else>
	                <article>
	                    <div class="task-title">
	                        <input type="checkbox" v-model="detail.complete">
	                        <span class="title"><span class="label" v-for="tag in detail.tags">{% tag.title %}</span><span>{% detail.title %}</span></span>
	                    </div>
	                    <div class="task-description">{% detail.description %}</div>
	                </article>
	                <footer>
	                    <p class="text-right">
	                        <a href="javascript:;" class="pure-button pure-button-primary ui-slick ui-sm" @click="render('editing')">编辑</a>
	                        <a href="javascript:;" class="pure-button ui-slick ui-sm" @click="delete">删除</a>
	                    </p>
	                </footer>
	            </template>
	        </template>
	        <template v-else>
	            <article>
	                <form @submit.prevent="save">
	                    <div class="task-title">
	                        <input type="checkbox" v-model="detail.complete" disabled="">
	                        <input type="text" v-model="title" v-el:input class="form-control">
	                    </div>
	                    <div class="pure-form task-description">
	                        <textarea class="pure-input" name="description" cols="30" rows="5" v-model="detail.description"></textarea>
	                    </div>
	                </form>
	            </article>
	            <footer>
	                <p class="text-right">
	                    <a href="javascript:;" class="pure-button pure-button-primary ui-slick ui-sm" @click="save">编辑完成</a>
	                    <a href="javascript:;" class="pure-button ui-slick ui-sm" @click="render('static')">取消</a>
	                </p>
	            </footer>
	        </template>
	    </div>
	</section>
</template>

<script>
	var task = require('models/task.model')

	module.exports = {
	    name: "task_detail",
	    data: function(){
	        return {
	            detail: task.default(),
	            state: {
	                ui: 'static'
	            },
	            title: ""
	        }
	    },
	    route: {
	        data: function(){
	            return {
	                detail: task.find(this.$route.params.id)
	            }
	        }
	    },
	    methods:{
	        render: function(state){
	            switch(this.state.ui = state){
	                case 'static':
	                    break;
	                case 'editing':
	                    this.title = task.compoundTitile(this.detail)
	                    this.$nextTick(function(){
	                        this.$els.input.focus()
	                    })
	                    break;
	            }
	        },
	        save: function(){
	            var data = $.extend(this.detail, task.dismantleTitle(this.title))
	            task
	                .save(data)
	                .then(function(){
	                    this.render('static')
	                }.bind(this))
	                .catch(function(){

	                }.bind(this))
	        },
	        delete: function(){
	            if(!confirm('确定删除 ' + this.detail.title + '吗？')) return;

	            task
	                .delete(this.detail.id)
	                .then(function(){
	                    this.$route.router.go({name: 'index'})
	                }.bind(this))
	                .catch(function(){

	                }.bind(this))
	        }
	    }
	}
</script>

<style lang="scss">
	#task-detail[__vuec__]{
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

	            > a{
	                color: #fff;
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

	    article{
	        padding: 1em;
	    }
	    footer{
	        padding: 1em;
	    }

	    
	    .task-title{
	        position: relative;
	        padding-left: 24px;
	        margin-bottom: 5px;
	        input[type=checkbox]{
	            position: absolute;
	            top: 6px;
	            left: 0;
	        }
	        > .title{
	            display: inline-block;
	            padding: .25em;
	        }
	    }
	    .task-description{
	        margin-left: 24px;
	        padding: .25em;
	        textarea{
	            padding: 0;
	            width: 100%;
	            border-radius: 0;
	            border: none;
	            box-shadow: none;
	            border-left: solid .25em #b0cadb;
	            padding-left: .25em;
	        }
	    }
	    
	    .editing{
	        .form-control{
	            width: 100%;
	        }
	    }
	}
</style>