(async () => {
    let response = await fetch("/getiphone5");
    let pricelists = await response.json();
  
    const pricelistsWrapperDiv = document.getElementById("pricelists-wrapper");
  
    pricelists.map(pricelist => {
      const pricelistDiv = document.createElement("div");
      pricelistDiv.innerHTML = `
          <form action="/update" method="post" class="w-full max-w-lg mx-auto">
          <input type="hidden" value=${pricelist.pricelistid} name="id">
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
            Repair
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
            value=${pricelist.title}
            name="title"
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
            Price
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
              mb-2
            "
            id="grid-last-name"
            name="price"
            value=${pricelist.price}
            class=""
            type="text"
          />
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
          Time
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
          name="time"
          value=${pricelist.time}
          class=""
          type="text"
        />
        </div>
      </div>
      
      <div class="w-full flex justify-center pt-5">
      <button
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white text-xl
          font-bold
          py-4
          px-4
          mt-5
          mr-2
          mb-5
          rounded
          w-full
          h-full
          focus:outline-none focus:shadow-outline
        "
      >
        Update
      </button>
    </form>
    
          <form
          class="mt-5"
          action="/delete/${pricelist.pricelistid}"
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
          </div>
    
          
          <br/><br/>
          
      `;
  
      pricelistsWrapperDiv.appendChild(pricelistDiv);
  
    });
  
  
  })();