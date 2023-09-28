function SibeNavar() {
    return ( <>
    <aside class="layout__aside">

<header class="aside__header">
    <h1 class="aside__title">Hola, Victor</h1>
</header>

<div class="aside__container">

    <div class="aside__profile-info">

        <div class="profile-info__general-info">
            <div class="general-info__container-avatar">
                <img src="assets/img/user.png" class="container-avatar__img" alt="Foto de perfil"/>
            </div>

            <div class="general-info__container-names">
                <a href="#" class="container-names__name">Victor Robles</a>
                <p class="container-names__nickname">VictorWeb</p>
            </div>
        </div>

        <div class="profile-info__stats">

            <div class="stats__following">
                <a href="#" class="following__link">
                    <span class="following__title">Siguiendo</span>
                    <span class="following__number">10</span>
                </a>
            </div>
            <div class="stats__following">
                <a href="#" class="following__link">
                    <span class="following__title">Seguidores</span>
                    <span class="following__number">13</span>
                </a>
            </div>


            <div class="stats__following">
                <a href="#" class="following__link">
                    <span class="following__title">Publicaciones</span>
                    <span class="following__number">17</span>
                </a>
            </div>


        </div>
    </div>


    <div class="aside__container-form">

        <form class="container-form__form-post">

            <div class="form-post__inputs">
                <label for="post" class="form-post__label">¿Que estas pesando hoy?</label>
                <textarea name="post" class="form-post__textarea"></textarea>
            </div>

            <div class="form-post__inputs">
                <label for="image" class="form-post__label">Sube tu foto</label>
                <input type="file" name="image" class="form-post__image"/>
            </div>

            <input type="submit" value="Enviar" class="form-post__btn-submit" disabled/>

        </form>

    </div>

</div>

</aside>
    </> );
}

export default SibeNavar;