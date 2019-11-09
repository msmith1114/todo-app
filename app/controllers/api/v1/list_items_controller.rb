class Api::V1::ListItemsController < ApplicationController
  before_action :set_listItem, only: [:show, :update, :destroy]

    def index
        @list = List.find(params[:list_id])
        respond_to do |format|
          format.json { render json: @list.list_items.order(:id) }
        end
      end


    def create
        @list = List.find(params[:list_id])
        @list_item = @list.list_items.create(list_item_params)
        if @list_item.save
            render json: @list_item, status: :created
        else
            render json: @list_item.errors, status: :unprocessable_entity
        end
        
    end

    def destroy
      @listItem.destroy
      if @listItem.destroy
        head :no_content, status: :ok
      else
        render json: @listItem.errors, status: :unprocessable_entity
      end      
    end

    private

    def set_listItem
      @listItem = ListItem.find(params[:id])
    end

    def list_item_params
        params.require(:list_item).permit(:content)
      end
    
end
