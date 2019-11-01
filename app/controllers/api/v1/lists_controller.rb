class Api::V1::ListsController < ApplicationController
  before_action :set_list, only: [:show, :update, :destroy]

    def index
      respond_to do |format|
        format.json { render json: List.order(:id) }
      end
    end

    def show

    end

    def create
      @list = List.create(list_params)
      if @list.save
        render json: @list, status: :created
      else
        render json: @list.errors, status: :unprocessable_entity
      end

    end

    def update
      if @list.update(list_params)        
        render json: @list
      else        
        render json: @list.errors, status: :unprocessable_entity      
      end
    end

    def destroy
      @list.destroy
      if @list.destroy
        head :no_content, status: :ok
      else
        render json: @list.errors, status: :unprocessable_entity
      end      
    end
      
    private

    def set_list
      @list = List.find(params[:id])
    end

    def list_params
      params.require(:list).permit(:title, :description)
    end

end
