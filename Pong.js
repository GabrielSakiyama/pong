const tela = document.getElementById('tela');
const contexto = tela.getContext('2d');
const  speed=3;
/*
    Criando classe
*/
        class barra{
            constructor({posicao}){
                this.posicao = posicao; //variavel publica
                    this.velocidade={   //Objeto publico
                    velVerti:0
                    }
                this.width=20;
                this.height=55;
            }

            draw(){
                contexto.fillStyle='red';
                contexto.fillRect(this.posicao.x,this.posicao.y,this.width,this.height);
            }

            update(){
                const cima = this.posicao.y + this.velocidade.velVerti;
                const baixo = this.posicao.y+this.velocidade.velVerti+this.height;
                contexto.clearRect(this.posicao.x,this.posicao.y,this.width,this.height);
                    if(
                        //Colisao do player com a parede de cima e de baixo
                        cima>=0 &&
                        baixo<=tela.height
                    )
                    this.posicao.y+=this.velocidade.velVerti;     
                    this.draw();
            }
        }

        class bola{
            constructor({posicao}){
                
                this.posicao=posicao;
                this.width=10;
                this.height=10;
                this.speed=1;
                const direcao = {
                    x:Math.random()-0.5 >= 0 ? -1 : 1,
                    y:Math.random()-0.5 >= 0 ? -1 : 1
                }

                this.velocidade={
                    x:direcao.x*speed,
                    y:direcao.y*speed
                }
            }
        
            draw(){
                contexto.fillStyle='white';
                contexto.fillRect(this.posicao.x,this.posicao.y,10,10);
            }
            


            update(){   
            // Lados da bola
                const cima = this.posicao.y+this.velocidade.y;
                const baixo = this.posicao.y+this.height + this.velocidade.y;
                const esquerda = this.posicao.x+this.velocidade.x;
                const direita = this.posicao.x + this.width + this.velocidade.x;

            //Colisao parede cima e baixo
                if(cima<=0 || baixo>=tela.height){
                    this.velocidade.y*=-1;
                }
                
            //Colisao jogador 1
                
                if(cima>=player1.posicao.y+player1.velocidade.velVerti
                    &&
                    baixo<=player1.posicao.y+player1.height+player1.velocidade.velVerti
                    &&
                    esquerda<=player1.posicao.x+player1.width
                    ){
                        this.velocidade.x*=-1;
                        this.velocidade.y*=-1;
                    }
                    
            //Colisao jogador 2
                    
                    if(cima>=player2.posicao.y+player2.velocidade.velVerti
                        &&
                        baixo<=player2.posicao.y+player2.height+player2.velocidade.velVerti
                    &&
                    direita>=player2.posicao.x
                    ){
                        this.velocidade.x*=-1;
                        this.velocidade.y*=-1;
                    }
            //Colisao parede direita e esquerda     

                    if(direita>=tela.width || esquerda <=0){
                       this.velocidade.x*=-1;
                       this.velocidade.y*=-1;

                    }
                        contexto.clearRect(this.posicao.x,this.posicao.y,this.width,this.height);
                        this.posicao.x+=this.velocidade.x;
                        this.posicao.y+=this.velocidade.y;
                        this.draw();     
         
            }
        }

//Criando o jogador

    const player1 = new barra({
        posicao:{
            x:10,
            y:tela.height/2
        }

    });

    const player2 = new barra({
        posicao:{
            x:tela.width-30,
            y:tela.height/2
        }

    });

/*
    Criando movimentação dos player
*/

    addEventListener('keydown',(tecla)=>{
        switch (tecla.key) {
            case 'w':
                player1.velocidade.velVerti=-speed;
            break;
        
            case 's':
                player1.velocidade.velVerti=speed;
            break;

            case 'ArrowUp':
                player2.velocidade.velVerti=-speed
            break;

            case 'ArrowDown':
                player2.velocidade.velVerti=speed
            break;
        }
    })

    function move(){
        requestAnimationFrame(move); 
            player1.update();
            player2.update();
    }

    move();

/*
    Criando a bola 
*/
    const ball = new bola(
        { posicao:{
                x:tela.width/2,
                y:tela.height/2
            }

        })
/*
    Criando movimentação da bola
*/

    function moveBall(){
        requestAnimationFrame(moveBall);
        ball.update();
    }

    moveBall();