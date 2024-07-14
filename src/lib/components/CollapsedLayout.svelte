<div class="full flex flex-col lg:flex-row lg:gap-2">
    <main
        class="overflow-x-hidden basis-full w-full lg:max-w-screen-md lg:order-2"
    >
        <slot name="main"></slot>
    </main>

    <div
        class="flex lg:contents flex-row z-20 h-12 border-t box-content border-gray-100"
    >
        <nav
            class="no-scrollbar flex flex-1 overflow-x-scroll lg:pt-16 lg:w-0 lg:order-3"
        >
            <slot name="nav" />
        </nav>
        <aside
            class="lg:pt-16 lg:flex lg:flex-1 lg:justify-end lg:w-0 lg:order-1"
        >
            {#if $$slots.aside}
                <input
                    class="hidden peer"
                    type="checkbox"
                    id="toggle-context"
                />
                <label
                    for="toggle-context"
                    class="flex h-12 aspect-square justify-center items-center flex-col gap-2 p-2 group peer-checked:bg-hover lg:hidden"
                >
                    <span
                        class="border-t border-b border-fg w-full transition origin-left peer-checked:group-[]:rotate-45 peer-checked:group-[]:translate-x-1 peer-checked:group-[]:-translate-y-px"
                    ></span>
                    <span
                        class="border-t border-b border-fg w-full transition-[width] peer-checked:group-[]:w-0"
                    ></span>
                    <span
                        class="border-t border-b border-fg w-full transition origin-left peer-checked:group-[]:-rotate-45 peer-checked:group-[]:translate-x-1 peer-checked:group-[]:translate-y-px"
                    ></span>
                </label>
                <div
                    class="hidden left-0 bottom-12 peer-checked:block peer-checked:absolute peer-checked:w-full lg:block"
                >
                    <slot name="aside" />
                </div>
            {/if}
        </aside>
    </div>
</div>
