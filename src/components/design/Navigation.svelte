<script>
    import { onMount } from 'svelte';

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function closeMenu() {
        isOpen = false;
    }

    onMount(() => {
        function handleKeydown(event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        }
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    });
</script>

<style>
    @media screen and (max-width: 1080px) {
        .toggle-button {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;
            text-align: center;
            padding: 10px;
            background: #007bff;
            color: white;
            cursor: pointer;
            z-index: 1000;
        }

        .drawer-menu {
            bottom: 0;
            transform: translateY(100%);
        }

        .drawer-menu.open {
            transform: translateY(0);
        }
    }

    @media screen and (min-width: 1081px) {
        .drawer-menu {
            top: 0;
            transform: translateY(-100%);
        }

        .drawer-menu.open {
            transform: translateY(0);
        }
    }

</style>

<div on:click={toggleMenu} class="toggle-button">Toggle Menu</div>

<div class={`drawer-menu fixed w-full h-screen bg-gray-100 transition-transform duration-300 ease-in-out ${isOpen ? 'open' : ''}`}>
    <button on:click={closeMenu} class="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full">X</button>
    <ul>
        <li><a href="#" class="block p-4">Home</a></li>
        <li><a href="#" class="block p-4">About</a></li>
        <li><a href="#" class="block p-4">Contact</a></li>
        <!-- Add more links as needed -->
    </ul>
</div>
