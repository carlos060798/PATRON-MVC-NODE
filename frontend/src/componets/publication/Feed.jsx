function FeedPage() {
    return (<>
       <section class="layout__content">

<header class="content__header">
    <h1 class="content__title">Timeline</h1>
    <button class="content__button">Mostrar nuevas</button>
</header>

<div class="content__posts">

    <div class="posts__post">

        <div class="post__container">

            <div class="post__image-user">
                <a href="#" class="post__image-link">
                    <img src="assets/img/user.png" class="post__user-image" alt="Foto de perfil"/>
                </a>
            </div>

            <div class="post__body">

                <div class="post__user-info">
                    <a href="#" class="user-info__name">Victor Robles</a>
                    <span class="user-info__divider"> | </span>
                    <a href="#" class="user-info__create-date">Hace 1 hora</a>
                </div>

                <h4 class="post__content">Hola, buenos dias.</h4>

            </div>

        </div>


        <div class="post__buttons">

            <a href="#" class="post__button">
                <i class="fa-solid fa-trash-can"></i>
            </a>

        </div>

    </div>

    <div class="posts__post">

        <div class="post__container">

            <div class="post__image-user">
                <a href="#" class="post__image-link">
                    <img src="assets/img/user.png" class="post__user-image" alt="Foto de perfil"/>
                </a>
            </div>

            <div class="post__body">

                <div class="post__user-info">
                    <a href="#" class="user-info__name">Victor Robles</a>
                    <span class="user-info__divider"> | </span>
                    <a href="#" class="user-info__create-date">Hace 1 hora</a>
                </div>

                <h4 class="post__content">Hola, buenos dias.</h4>

            </div>
        </div>

        <div class="post__buttons">

            <a href="#" class="post__button">
                <i class="fa-solid fa-trash-can"></i>
            </a>

        </div>

    </div>

    
    <div class="posts__post">

        <div class="post__container">

            <div class="post__image-user">
                <a href="#" class="post__image-link">
                    <img src="assets/img/user.png" class="post__user-image" alt="Foto de perfil"/>
                </a>
            </div>

            <div class="post__body">

                <div class="post__user-info">
                    <a href="#" class="user-info__name">Victor Robles</a>
                    <span class="user-info__divider"> | </span>
                    <a href="#" class="user-info__create-date">Hace 1 hora</a>
                </div>

                <h4 class="post__content">Hola, buenos dias.</h4>

            </div>
        </div>

        <div class="post__buttons">

            <a href="#" class="post__button">
                <i class="fa-solid fa-trash-can"></i>
            </a>

        </div>

    </div>



    
    <div class="posts__post">

        <div class="post__container">

            <div class="post__image-user">
                <a href="#" class="post__image-link">
                    <img src="assets/img/user.png" class="post__user-image" alt="Foto de perfil"/>
                </a>
            </div>

            <div class="post__body">

                <div class="post__user-info">
                    <a href="#" class="user-info__name">Victor Robles</a>
                    <span class="user-info__divider"> | </span>
                    <a href="#" class="user-info__create-date">Hace 1 hora</a>
                </div>

                <h4 class="post__content">Hola, buenos dias.</h4>

            </div>
        </div>

        <div class="post__buttons">

            <a href="#" class="post__button">
                <i class="fa-solid fa-trash-can"></i>
            </a>

        </div>

    </div>


</div>

<div class="content__container-btn">
    <button class="content__btn-more-post">
        Ver mas publicaciones
    </button>
</div>

</section>

    </>  );
}

export default FeedPage;