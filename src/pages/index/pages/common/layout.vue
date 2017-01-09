<template>
	<section class="pure-g">
	    <div class="sidebar pure-u-1 pure-u-md-1-4">
	        <header class="header">
	            <h1 class="brand-title">To Do List</h1>
	            <h2 class="brand-tagline">基于vue和fis的例子</h2>
	            <nav class="nav">
	                <ul class="nav-list">
	                    <li class="nav-item">
	                        <a class="pure-button" target="__brank" href="http://fis.baidu.com">FIS</a>
	                    </li>
	                    <li class="nav-item">
	                        <a class="pure-button" target="__brank" href="http://vuejs.org">Vue</a>
	                    </li>
	                </ul>
	            </nav>
	        </header>
	    </div>
	    <div class="content pure-u-1 pure-u-md-3-4">
	        <slot></slot>
	    </div>
	</section>
</template>

<style lang="scss">
	@import "partials/common/fun.scss";

	.sidebar {
	    background: rgb(61, 79, 93);
	    color: #fff;
	    overflow: hidden;
	    
	    @media (min-width: 48em) {
	        position: fixed;
	        top: 0;
	        bottom: 0;
	        width: auto;
	    }

	    .header {
	        font-family: "Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif;
	        text-align: center;
	        top: auto;
	        margin: 3em auto;
	        
	        transform: translate(0, 125%);
	        opacity: 0;

	        animation-name: layout-sidebar-heading;
	        animation-duration: 0.5s;
	        animation-iteration-count: 1;
	        animation-timing-function: linear;
	        animation-fill-mode: forwards;
	        animation-delay: 0.5s;

	        @media (min-width: 48em) {
	            margin: 80% 2em 0;
	            text-align: right;
	        }
	    }

	    .brand-title,
	    .brand-tagline {
	        margin: 0;
	    }
	    .brand-title {
	        text-transform: uppercase;
	    }
	    .brand-tagline {
	        font-weight: 300;
	        color: rgb(176, 202, 219);
	    }

	    .nav-list {
	        margin: 0;
	        padding: 0;
	        list-style: none;
	    }
	    .nav-item {
	        display: inline-block;
	        *display: inline;
	        zoom: 1;
	    }
	    .nav-item a {
	        background: transparent;
	        border: 2px solid rgb(176, 202, 219);
	        color: #fff;
	        margin-top: 1em;
	        letter-spacing: 0.05em;
	        text-transform: uppercase;
	        font-size: 85%;
	    }
	    .nav-item a:hover,
	    .nav-item a:focus {
	        border: 2px solid rgb(61, 146, 201);
	        text-decoration: none;
	    }
	}

	.content {
	    @media (min-width: 48em) {
	        margin-left: 25%;
	    }
	}


	@keyframes layout-sidebar-heading{
	    100%{
	        opacity: 1;
	        transform: translate(0, 0);
	    }
	}
</style>