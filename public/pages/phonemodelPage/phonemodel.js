(async () => {
    let response = await fetch("/phonemodels");
    let phonemodels = await response.json();
  
    const phonemodelsWrapperDiv = document.getElementById("phonemodels-wrapper");
  
    phonemodels.map(phonemodel => {
        const phonemodelDiv = document.createElement("div");
        phonemodelDiv.innerHTML = `
        <form action="/update" method="post" class="w-full max-w-lg mx-auto">
        <input type="hidden" value=${phonemodel.id} name="id">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="
            block
            uppercase
            tracking-wide
            text-gray-700 text-xs
            font-bold
            mb-2
          "
          for="grid-first-name"
        >
          phonemodel name
        </label>
        <input
          class="
            appearance-none
            block
            w-full
            bg-gray-200
            text-gray-700
            rounded
            py-3
            px-4
            mb-3
            leading-tight
            focus:outline-none focus:bg-white
          "
          value=${phonemodel.name}
          name="name"
          class=""
          type="text"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="
            block
            uppercase
            tracking-wide
            text-gray-700 text-xs
            font-bold
            mb-2
          "
          for="grid-last-name"
        >
          description
        </label>
        <input
          class="
            appearance-none
            block
            w-full
            bg-gray-200
            text-gray-700
            border border-gray-200
            rounded
            py-3
            px-4
            leading-tight
            focus:outline-none focus:bg-white focus:border-gray-500
          "
          id="grid-last-name"
          name="description"
          value=${phonemodel.description}
          class=""
          type="text"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="
            block
            uppercase
            tracking-wide
            text-gray-700 text-xs
            font-bold
            mb-2
          "
          for="grid-last-name"
        >
          linknology
        </label>
        <input
          class="
            appearance-none
            block
            w-full
            bg-gray-200
            text-gray-700
            border border-gray-200
            rounded
            py-3
            px-4
            leading-tight
            focus:outline-none focus:bg-white focus:border-gray-500
          "
          name="link"
          type="text"
          value=${phonemodel.link}
        />
      </div>
    </div>
    <button
      class="
        bg-blue-500
        hover:bg-blue-700
        text-white text-xl
        font-bold
        py-4
        px-4
        rounded
        w-64
        focus:outline-none focus:shadow-outline
      "
    >
      Update
    </button>
  </form>
  
        <form
        class="mt-5"
        action="/delete/${phonemodel.id}"
        method="get">
  
        <button
        class="
        bg-red-500
        hover:bg-red-700
        text-white text-xl
        font-bold
        py-4
        px-4
        rounded
        w-64
        focus:outline-none focus:shadow-outline
        ">
            Delete
        </button> 
        </form>
  
        
        <br/><br/>
        
    `;
  
        phonemodelsWrapperDiv.appendChild(phonemodelDiv);
  
    });
  
  
  })();