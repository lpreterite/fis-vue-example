<header class="header">
    <h1>Header</h1>
</header>
<section class="container">
    <aside class="sidebar">
        <nav>
            <ul>
                <li><a v-link="'/'">index</a></li>
                <li><a v-link="'/account/user'">users</a></li>
                <li><a v-link="'/account/signout'">signout</a></li>
            </ul>
        </nav>
    </aside>
    <article class="content">
        <router-view></router-view>
    </article>
</section>