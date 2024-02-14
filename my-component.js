class MyComponent extends HTMLElement {
    constructor() {
      super();
      
      this.shadow = this.attachShadow({ mode: 'open' });
     
      this.shadow.innerHTML = `
   <style>
          /* Your component styles */
          .container {
            background-color: #ffffff;
            width: 340px;
            height: 700px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-self: center;
            margin: 20px;
            // opacity: 0.5;
            font-family: "Poppins", sans-serif;
            font-weight: 400;
            font-style: normal;

          }
          .checklist-itemscontainer {
            width: inherit;
            align-items: left;
            padding-left: 20px;
            flex: 1;
            
          }
          
          svg {
            width: 20px;
            height: 20px;
          }
          .text {
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            margin-top: 20px;
            margin-right: 190px;
            color: #b7b7d9;
          }
          .due-date {
            display: flex;
            margin-bottom: 20px;
            margin-right: 200px;
            color: #949494;
            font-size: 24px
          }
          .plus-icon {
            position: relative;
            left: 200px;
            width: 30px;
            height: 30px;
          
          }
          .arrow-icon {
            padding-top: 4px;
          }
          .text1 {
            margin-right: 100px;
            color: #949494;
            position: relative;
          
            bottom: 20px;
           
           
          }
          .checkbox-label input[type="checkbox"] + label:before { 
            content: "";
            display: inline-block;
            width: 12px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid red;

           
    
          }
          
          .checkbox-label {
            margin-bottom: 5px;
            margin-right: 25px;
            accent-color: #B5EA81;
            display: block;
            line-height: 40px;
           
          }
          label {
            display: inline-block;
            margin-left: 5px;
            appearance: none;
            border-radius: 50%;
            border: 1px;
            color: #949494;
          }
         
          .line {
            width: 80%;
            border-top: 1px solid #ccc;
            margin: 20px 0;
            position: relative;
            bottom: 25px;
          }
          .icon {
            font-size: 24px;
            margin-bottom: 10px;
          }

          .progress-bar {
            width: 90%;
            height: 20px;
            background-color: #f0f0f0;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 20px;
          }
          .progress {
            height: 100%;
            background-color: #B3B3EF;
            border-radius: 10px;
            width: 0%;
          }
          .progress-percentage {
            color:#b7b7d9;
            font-size: 14px;
            
          }
          .buttons {
            padding: 10px 70px;

            color: #949494;
            border: none;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            cursor: pointer;

          }
          .daily {
            padding: 10px 50px;
            background-color: #F5ED84;
            border: none;
            border-radius: 15px;
            position: relative;
            right: 80px;
          }
          .weekly {
            padding: 10px 50px;
            background-color: #B5EA81;
            border: none;
            border-radius: 15px;
            position: relative;
            left: 80px;
            bottom: 35px
          }
          .monthly {
            padding: 10px 40px;
            background-color: #F8AAAA;
            border: none;
            border-radius: 15px;
            position: relative;
            right: 80px;
          }
          .occasional {
            padding: 10px 40px;
            background-color: #B3B3EF;
            border: none;
            border-radius: 15px;
            position: relative;
            left: 80px;
            bottom: 35px
          }
   </style>
   <div class="container">
   
   
   <span class="text"><svg class="arrow-icon"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
   <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
 </svg></i>Back to lists</span>
   <span class="due-date">TODAY <svg xmlns="http://www.w3.org/2000/svg" class="plus-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke=" #b7b7d9" class="w-6 h-6">
   <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
 </svg>
 
 </span>
   <div class="progress-bar">
   <div class="progress"></div>
   </div>
   <span class="progress-percentage">33% Complete</span>
   <div class="checklist-itemscontainer">
   <label class="checkbox-label"><input type="checkbox"> Meditation</label>
   <label class="checkbox-label"><input type="checkbox"> Pick up Arena</label>
   <label class="checkbox-label"><input type="checkbox"> Set up meeting with Jay</label>
   <label class="checkbox-label"><input type="checkbox"> Finish Daily Ui</label>
   <label class="checkbox-label"><input type="checkbox"> Second Edits on Article</label>
   <label class="checkbox-label"><input type="checkbox"> Email Chris</label>
   </div>
   <div class="line"></div>
   <span class="text1">Pulling from recurring lists</span>
   
   
   <button class="buttons daily">Daily</button>
   <button class="buttons weekly">Weekly</button>
   <button class="buttons monthly">Monthly</button>
   <button class="buttons occasional">Occasional</button>
   
   </div>
   
      `;
    }
    connectedCallback() {

      const checkboxes = this.shadow.querySelectorAll('.checkbox-label input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateProgress();
      });
    });
    this.updateProgress();
  }

  updateProgress() {
    const checkboxes = this.shadow.querySelectorAll('.checkbox-label input[type="checkbox"]');
    const checkedCount = [...checkboxes].filter(checkbox => checkbox.checked).length;
    const totalCheckboxes = checkboxes.length;
    const progress = (checkedCount / checkboxes.length) * 100;
    this.setProgress(progress);
  }

  setProgress(progress) {
    
    progress = Math.max(0, Math.min(progress, 100));
    const progressBar = this.shadow.querySelector('.progress');
    progressBar.style.width = progress + '%';
  }
    
   }



   
 
   customElements.define('my-component', MyComponent);



 