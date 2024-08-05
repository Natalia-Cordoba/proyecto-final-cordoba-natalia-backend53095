export const Chat = () => {
    return (
        <section>
            <h1>Chat con WebSockets</h1>
            <div>
                <label for="chatbox">Ingrese su mensaje</label>
                <input id="chatBox" type="text" />
            </div>
            <p id="messageLogs" class="mensajes"></p>
        </section>
    )
}