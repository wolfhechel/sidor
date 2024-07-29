<div class="full flex flex-col lg:flex-row">
    <nav
        class="no-scrollbar flex overflow-x-scroll h-12 lg:h-auto lg:py-14 lg:px-8 lg:w-60"
    >
        <slot name="nav" />
    </nav>
    <main class="overflow-x-hidden basis-full w-full lg:flex-1">
        <slot name="main"></slot>
    </main>
</div>
